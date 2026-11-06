type Data = {
    msg:string,
    ok:boolean
}
export default function Toast({msg,ok}:Data){
    const bgClass = ok ? 'bg-green-600' : 'bg-red-600';
    return (
        <div className={'fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white font-medium ' + bgClass}>
            {msg}
        </div>
    )
}
