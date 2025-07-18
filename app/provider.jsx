"use client"

import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { db } from '@/configs/db'
import { UsersTable } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { UserDetailContext } from '@/context/UserDetailContext'

function Provider({ children }) {
  const { isLoaded, user } = useUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (isLoaded && user) {
      createNewUser();
    } else {
      // Clear user detail when not logged in
      setUserDetail(null);
    }
  }, [isLoaded, user]);

  const createNewUser = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    const name = user?.fullName;
    
    if (!email) {
      console.error("No email address found for the user");
      return;
    }

    try {
      // Check if user already exists
      const existingUsers = await db
        .select()
        .from(UsersTable)
        .where(eq(UsersTable.email, email));

      // If user exists, set user detail
      if (existingUsers.length > 0) {
        setUserDetail(existingUsers[0]);
        console.log("ℹ️ User exists:", existingUsers[0]);
      } 
      // Create new user if not found
      else {
        const [newUser] = await db
          .insert(UsersTable)
          .values({
            name: name || "Unknown",
            email: email,
            SubscriptionId: "free"
          })
          .returning();
        
        setUserDetail(newUser);
        console.log("✅ New user created:", newUser);
      }
    } catch (error) {
      console.error("❌ Database operation failed:", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div className='w-full'>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;