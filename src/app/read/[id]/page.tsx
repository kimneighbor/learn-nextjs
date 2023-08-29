export default async function Read (props:any) {
    const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`);
    const topic = await resp.json();

    return(
        <>
        {/*<h2>read/[id]/page.tsx</h2>*/}
            <h2>{topic.title}</h2>
            {/*데이터 출력*/}
            {topic.body}
            {/*parameters : {props.params.id}*/}
        </>
    )
}