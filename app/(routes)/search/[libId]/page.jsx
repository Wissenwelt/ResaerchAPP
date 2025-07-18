"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { db } from '@/configs/db';
import { eq } from "drizzle-orm";
import { Library } from '@/configs/schema';
import Header from './_components/Header'
import DisplayResult from './_components/DisplayResult';

function SearchQueryResult() {
    const params = useParams();
    const libId = params.libId;
    const [searchInputRecord, setSearchInputRecord] = useState(null);

    useEffect(() => {
        const fetchRecord = async () => {
            const result = await db.select()
                .from(Library)
                .where(eq(Library.libId, libId))
                .execute();

            setSearchInputRecord(result[0] || null);
        };

        if (libId) {
            fetchRecord();
        }
    }, [libId]);

    return (
        <div className='w-full'>
            <Header searchInputRecord={searchInputRecord} />
            <div className='px-10 md:px-20 lg:px-36 xl:px-56 mt-20 w-full'>
                <DisplayResult searchInputRecord={searchInputRecord} />
            </div>
        </div>
    )
}

export default SearchQueryResult;