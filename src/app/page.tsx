import Image from 'next/image'

export default function Home() {
    return (
        <>
            <h2>Welcome page.tsx</h2>
            page.tsx
            {/*public 밑에 있는 png 를 가르킨다.*/}
            <img src="/hello.png"></img>
        </>
    )
}
