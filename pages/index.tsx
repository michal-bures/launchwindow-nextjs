import Link from 'next/link';
import {PageHeader} from '../components/page-header';
import React, {useState} from 'react';
import {LaunchDetails} from '../api/types';
import moment from 'moment';
import styles from './index.module.css';

export interface Props {
    launches: Array<LaunchDetails>
}


export default function Home(props: Props) {

    const [launches, setLaunches] = useState(props.launches);
    const [loadingMore, setLoadingMore] = useState(false);

    return (
        <div className="container">
            <PageHeader/>

            <main className="content">
                <h2 className="title">
                    Upcoming launches
                </h2>
                {launches.map(launch => <LaunchListItem key={launch.id} launch={launch}/>)}
                <button onClick={fetchMore} disabled={loadingMore}>See more {loadingMore ? '...' : ''}</button>

            </main>
        </div>
    );

    async function fetchMore() {
        setLoadingMore(true);
        const newLaunches = await fetchUpcomingLaunches(launches.length, 5);
        setLaunches([...launches, ...newLaunches]);
        setLoadingMore(false);
    }

}

export function LaunchListItem({launch}: { launch: LaunchDetails }) {
    const formattedDate = moment(launch.isonet).format('MMM Do');
    return (

            <article className='card' key={launch.id}>
                    <div className={styles.launchDate}>
                        {formattedDate}
                    </div>
                    <div className={styles.launchDetails}>
                        <div><b>{launch.rocketName}</b></div>
                        <div> <Link href={`/rockets/[rocketId]`} as={`/rockets/${launch.rocket.id}`}>{launch.rocketType}</Link> will launch from {launch.location.name}</div>

                    </div>

            </article>
    )
}

export async function fetchUpcomingLaunches(offset = 0, limit = 5) {
    const url = new URL('https://launchlibrary.net/1.4/launch');
    url.search = new URLSearchParams({
        mode: "verbose",
        offset: offset.toString(),
        next: limit.toString(),
    }).toString();

    const res = await fetch(url.toString());
    return (await res.json()).launches.map(importLaunchDetails);
}

export async function getServerSideProps() {
    return {
        props: {
            launches: await fetchUpcomingLaunches(),
        },
    }
}

export function importLaunchDetails(rawData): LaunchDetails {
    const [rocketType, rocketName] = rawData.name.split(' | ');

    return {
        ...rawData,
        rocketName,
        rocketType
    }
}
