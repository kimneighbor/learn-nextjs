"use client"

// AppRouter 에서는 next/navigation 에서 가져와야 한다 PageRouter 에서는 next/router
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Update() {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        fetch('http://localhost:9999/topics/' + id)
            .then(resp => resp.json())
            .then(result => {
                setTitle(result.title);
                setBody(result.body);
            })
    }, [id]);
    return (
        // onSubmit 은 사용자와 상호작용할때 실행된다. 사용자와 상호작용 하는 것은 서버컴포넌트에서 다루지 않는다.
        // 때문에 use client 사용
        <form onSubmit={(e) => {
            e.preventDefault();


            // const form = e.target as HTMLFormElement;
            // // form.elements.namedItem("title")은 폼 안에서 이름이 "title"인 요소를 가져온다.
            // // (form.elements.namedItem("title") as HTMLInputElement)는 가져온 요소를 HTMLInputElement 타입으로 캐스팅한다.
            // // 이를 통해 input 요소의 속성과 메서드에 접근할 수 있다.
            // // ?.value는 옵셔널 체이닝을 사용하여 만약 해당 요소가 존재하지 않으면 undefined를 반환한다.
            // // 따라서 title은 "title" 요소의 값인 value를 가지게된다.
            // const title = (form.elements.namedItem("title") as HTMLInputElement)?.value;
            // const body = (form.elements.namedItem("body") as HTMLTextAreaElement)?.value;
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                // json 데이터 타입으로 전환
                body: JSON.stringify({title, body})
            }
            fetch('http://localhost:9999/topics/'+id, options)
                .then(res => res.json())
                .then(result => {
                    // 마지막(방금) 생성한 result 의 id 값을 받음
                    const lastid = result.id;
                    //캐시 리프레시
                    router.refresh();
                    // lastid 값을 redirection
                    router.push(`/read/${lastid}`);
                })
        }}>
            <p>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </p>
            <p>
                <textarea
                    name="body"
                    placeholder="body"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                ></textarea>
            </p>
            <p>
                <input type="submit" value="update"/>
            </p>
        </form>
    )
}