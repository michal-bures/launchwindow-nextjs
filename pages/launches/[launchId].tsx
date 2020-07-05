import {useRouter} from 'next/router';
import {LaunchDetails} from '../../api/types';
import {GetStaticPaths} from 'next';
import {PageHeader} from '../../components/page-header';
import React from 'react';

export interface Props {
    launch: LaunchDetails
}

export interface StaticProps {
    params: {
        launchId: string
    }
}

export default function LaunchDetail(props: Props) {
    const router = useRouter();
    const { launchId } = router.query;

    if (router.isFallback) {
        return <p>Loading...</p>;
    }

    return (
        <div className='container'>
            <PageHeader title={props.launch.name}/>
            <p>Launch id: {launchId} data: {JSON.stringify(props.launch)}</p>
        </div>
    )
}

export async function getStaticPaths() {
    return {paths: ['/launches/1937'], fallback: true};
}

export async function getStaticProps({ params }: StaticProps) {
    const res = await fetch(`https://launchlibrary.net/1.4/launch?id=${encodeURI(params.launchId)}`);
    const launch = (await res.json()).launches[0];
    return {
        props: {
            launch,
        },
    }
}
