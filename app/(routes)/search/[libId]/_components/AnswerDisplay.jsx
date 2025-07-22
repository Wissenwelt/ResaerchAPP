import Image from 'next/image';
import React from 'react';

function AnswerDisplay({ searchResult }) {
    const webResult = searchResult?.web?.results;
    const duplicatedResults = webResult ? [...webResult, ...webResult] : [];

    return (
        <div className="relative mt-5 w-full">
            <div className="overflow-hidden w-full">
                <div className="flex animate-marquee">
                    {duplicatedResults.map((item, index) => (
                        <div
                            key={index}
                            className="mx-2 p-3 bg-accent rounded-lg flex-shrink-0 cursor-pointer w-48 sm:w-52"
                            onClick={()=>window.open(item.url,'_blank')}
                        >
                            <div className="flex gap-2 items-center">
                                {item?.profile?.img && (
                                    <Image
                                        src={item.profile.img}
                                        alt={item?.profile?.name || item.title}
                                        width={20}
                                        height={20}
                                        className="rounded-full"
                                    />
                                )}
                                <h2 className="text-xs font-medium truncate">
                                    {item?.profile?.long_name}
                                </h2>
                            </div>
                            <div
                                className="line-clamp-3 text-black text-xs mt-2"
                                dangerouslySetInnerHTML={{ __html: item?.description }}
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AnswerDisplay;