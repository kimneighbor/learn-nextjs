export default async function Read(props: any) {
    const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`
        // 캐시 데이터 사용하지 않음
        , {cache: "no-store"});
    const topic = await resp.json();

    return (
        <>
            {/*<h2>read/[id]/page.tsx</h2>*/}
            <h2>{topic.title}</h2>
            {/*데이터 출력*/}
            {topic.body}
            {/*parameters : {props.params.id}*/}
        </>
    )
}