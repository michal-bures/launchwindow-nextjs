import {useRouter} from 'next/router';
import {RocketDetails, RocketFamilyDetails} from '../../api/types';
import {PageHeader} from '../../components/page-header';
import React from 'react';
import style from './[rocketId].module.css';

export interface Props {
    rocket: RocketDetails,
    family: RocketFamilyDetails
}

export interface RouteProps {
    params: {
        rocketId: string
    }
}

export default function RocketDetail(props: Props) {
    const router = useRouter();

    if (router.isFallback) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <PageHeader title={props.rocket.name}/>
            <div className={style.content}>
                <img className={style.previewImage} src={getRocketImageUrl(props.rocket)}/>
                <article>
                    <h2>{props.rocket.name}</h2>
                    <p>Used by: {listAgencies(props.family)}
                    </p>
                    <p>Learn more on <a href={props.rocket.wikiURL}>Wikipedia</a></p>
                </article>
            </div>
        </>
    )
}

export function listAgencies(family: RocketFamilyDetails) {
    if (family.agencies.length === 0) {
        return <span>(unknown)</span>;
    } else {
        return (
            <ul>
                {family.agencies.map(agency => <li><a href={agency.wikiURL}>{agency.name}</a></li>)}
            </ul>
        )
    }
}

export function getRocketImageUrl(rocket: RocketDetails) {
    const minImageSize = rocket.imageSizes[0];
    const maxImageSize = rocket.imageSizes[rocket.imageSizes.length - 1];
    const url = rocket.imageURL.replace(maxImageSize.toString(), minImageSize.toString());
    return url;
}

export async function getStaticPaths() {
    const allRocketsRes = await fetch('https://launchlibrary.net/1.4/rocket?mode=list');
    const allRockets = (await allRocketsRes.json()).rockets;
    const allRocketPaths = allRockets.map(rocket => `/rockets/${rocket.id}`);
    return {paths: allRocketPaths, fallback: true};
}

export async function getStaticProps({params}: RouteProps) {
    const rocketRes = await fetch(`https://launchlibrary.net/1.4/rocket/${encodeURIComponent(params.rocketId)}`);
    const rocket: RocketDetails = (await rocketRes.json()).rockets[0];

    const familyRes = await fetch(`https://launchlibrary.net/1.4/rocketfamily/${encodeURIComponent(rocket.family.id)}`);
    const family: RocketFamilyDetails = (await familyRes.json()).RocketFamilies[0];

    return {
        props: {
            rocket,
            family
        },
    }
}
