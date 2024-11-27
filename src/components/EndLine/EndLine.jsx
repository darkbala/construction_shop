import styles from './EndLine.module.scss'
import {Link} from "react-router-dom";

export default function EndLine() {
    return (
        <main className={styles.wrap}>
            <section className={styles.content}>
                <div className={styles.left}>
                    <svg width="154" height="44" viewBox="0 0 154 44" fill="none" xmlns="http://www.w3.org/2000/svg"
                         className={styles.logo}
                         xmlnsXlink="http://www.w3.org/1999/xlink">
                        <rect width="154" height="44" fill="url(#pattern0_103_1313)"/>
                        <defs>
                            <pattern id="pattern0_103_1313" patternContentUnits="objectBoundingBox" width="1"
                                     height="1">
                                <use xlinkHref="#image0_103_1313"
                                     transform="matrix(0.00196464 0 0 0.00687623 0 -0.00196464)"/>
                            </pattern>
                            <image id="image0_103_1313" width="509" height="146"
                                   xlinkHref="data:image/png;base64,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"/>
                        </defs>
                    </svg>
                    <div className={styles.down}>
                        <p className={styles.big}>Первый отечественный бренд на рынке сантехники от компании ОсОО
                            “Стройдом.кг”</p>
                        <p className={styles.small}>© 2023 Iskender.kg - Отечественный бренд сантехники</p>
                    </div>
                </div>
                <div className={styles.right} style={{alignItems: "center", gap: "10px"}}>
                    <Link to={"https://wa.me/+996705088199"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 25 25" fill="none">
                            <path
                                d="M21.0182 3.93135C19.9103 2.81257 18.5907 1.92548 17.1365 1.32179C15.6822 0.718104 14.1224 0.409888 12.5478 0.415104C5.95031 0.415104 0.573229 5.79219 0.573229 12.3897C0.573229 14.5043 1.12906 16.5584 2.16823 18.3709L0.476562 24.5818L6.82031 22.9143C8.5724 23.8689 10.542 24.3764 12.5478 24.3764C19.1453 24.3764 24.5224 18.9993 24.5224 12.4018C24.5224 9.19969 23.2778 6.19094 21.0182 3.93135ZM12.5478 22.3464C10.7595 22.3464 9.0074 21.863 7.47281 20.9568L7.11031 20.7393L3.34031 21.7301L4.34323 18.0568L4.10156 17.6822C3.10777 16.0957 2.58018 14.2617 2.57906 12.3897C2.57906 6.90385 7.0499 2.43302 12.5357 2.43302C15.1941 2.43302 17.6953 3.47219 19.5682 5.35719C20.4958 6.28019 21.2308 7.37818 21.7307 8.58746C22.2306 9.79674 22.4854 11.0932 22.4803 12.4018C22.5045 17.8876 18.0336 22.3464 12.5478 22.3464ZM18.0095 14.903C17.7074 14.758 16.2332 14.033 15.9674 13.9243C15.6895 13.8276 15.4961 13.7793 15.2907 14.0693C15.0853 14.3714 14.5174 15.048 14.3482 15.2414C14.1791 15.4468 13.9978 15.4709 13.6957 15.3139C13.3936 15.1689 12.427 14.8426 11.2911 13.8276C10.397 13.0301 9.8049 12.0514 9.62365 11.7493C9.45448 11.4472 9.59948 11.2901 9.75656 11.133C9.88948 11.0001 10.0586 10.7826 10.2036 10.6134C10.3486 10.4443 10.4091 10.3114 10.5057 10.118C10.6024 9.9126 10.5541 9.74344 10.4816 9.59844C10.4091 9.45344 9.8049 7.97927 9.56323 7.3751C9.32156 6.7951 9.06781 6.8676 8.88656 6.85552H8.30656C8.10115 6.85552 7.78698 6.92802 7.50906 7.2301C7.24323 7.53219 6.4699 8.25719 6.4699 9.73135C6.4699 11.2055 7.54531 12.6314 7.69031 12.8247C7.83531 13.0301 9.8049 16.0509 12.8016 17.3439C13.5145 17.658 14.0703 17.8393 14.5053 17.9722C15.2182 18.2018 15.8707 18.1655 16.3903 18.093C16.9703 18.0084 18.1666 17.368 18.4082 16.6672C18.662 15.9664 18.662 15.3743 18.5774 15.2414C18.4928 15.1084 18.3116 15.048 18.0095 14.903Z"
                                fill="white" fillOpacity="0.8"/>
                        </svg>
                    </Link>
                    <Link to={"https://www.instagram.com/iskender_home?igsh=MXZ2NHliOWllbHo5OA=="}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35x`" viewBox="0 0 29 29"
                             fill="none">
                            <path
                                d="M2.63672 13.1819C2.63672 8.21107 2.63672 5.72497 4.18163 4.18138C5.72654 2.63779 8.21131 2.63647 13.1822 2.63647H15.8185C20.7894 2.63647 23.2755 2.63647 24.8191 4.18138C26.3627 5.72629 26.364 8.21107 26.364 13.1819V15.8183C26.364 20.7892 26.364 23.2752 24.8191 24.8188C23.2742 26.3624 20.7894 26.3637 15.8185 26.3637H13.1822C8.21131 26.3637 5.72522 26.3637 4.18163 24.8188C2.63804 23.2739 2.63672 20.7892 2.63672 15.8183V13.1819Z"
                                stroke="white" strokeOpacity="0.8"/>
                            <path
                                d="M20.4324 10.5456C21.5244 10.5456 22.4096 9.66035 22.4096 8.56834C22.4096 7.47632 21.5244 6.59106 20.4324 6.59106C19.3403 6.59106 18.4551 7.47632 18.4551 8.56834C18.4551 9.66035 19.3403 10.5456 20.4324 10.5456Z"
                                fill="white" fillOpacity="0.8"/>
                            <path
                                d="M14.5004 19.1137C17.0484 19.1137 19.114 17.0482 19.114 14.5001C19.114 11.9521 17.0484 9.88647 14.5004 9.88647C11.9523 9.88647 9.88672 11.9521 9.88672 14.5001C9.88672 17.0482 11.9523 19.1137 14.5004 19.1137Z"
                                stroke="white" strokeOpacity="0.8"/>
                        </svg>
                    </Link>
                </div>
            </section>
        </main>
    )
}
