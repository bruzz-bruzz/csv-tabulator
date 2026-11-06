type Data = {
    profileURL:string,
    repoURL:string
}

export default function Github({profileURL,repoURL}:Data){
    return (
        <footer className='border-t border-gray-200 mt-10'>
            <div className='max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4'>
                <p className='text-sm text-gray-500'>Built by bruzz-bruzz</p>
                <div className='flex gap-6'>
                    <a className='text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors' href={profileURL}>GitHub Profile</a>
                    <a className='text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors' target='_blank' href={repoURL}>Project Repository</a>
                </div>
            </div>
        </footer>
    )
}
