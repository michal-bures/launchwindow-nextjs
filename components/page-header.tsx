import Link from 'next/link';
import styles from './page-header.module.css';

export interface Breadcrumb {
    title: string,

}

export interface Props {
    title?: string
}

export function PageHeader(props: Props) {
    return (
        <nav className={styles.headerNav}>
            <Link href='/'><a>🚀 Launch window</a></Link><span>&nbsp;{ props.title && '> ' + props.title}</span>
        </nav>
    )
}
