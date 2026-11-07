import './App.css'
import Toast from './Toast'
import Github from './Github'
import {useState} from 'react'
export default function App(){
  const [csvData, setCsvData] = useState<string[][] | null>(null)
  const [toast,setToast] = useState({msg:"",ok:false})
  const [reading,setReading] = useState(false)
  const [page,setPage] = useState(0)
  function clearToast(){
    setTimeout(()=>{
      setToast({msg:"",ok:false})
    },3000)
  }
  function readFileData(file:File){
    setReading(true)
    if(!file){
      setToast({msg:"Please select a file",ok:false})
      setReading(false)
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      let arr:string[][] = result ? result.split('\n').map((row) => row.split(',')) : []
      setCsvData(arr)
      setReading(false)
    }
    reader.onerror = (e) => {
      console.log("Error reading file", e)
      setReading(false)
    }
    reader.readAsText(file)
    setToast({msg:"File read successfully",ok:true})
    clearToast()
  }
  function returnAsHTML(arr:string[]){
    return (
      arr.map((val,idx)=>(
        <td key={String(idx)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val}</td>
      ))
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">CSV Viewer</h1>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload CSV File</label>
          <input 
            type='file' 
            accept='text/csv' 
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                readFileData(e.target.files[0])
              }
            }} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
          />
        </div>
        
        {reading === true && (
          <p className='text-center text-gray-500 py-10'>Reading CSV file...(This may take a moment)</p>
        )}
        
        {csvData !== null && reading === false && (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700">{csvData.length} ROWS x {csvData[0].length} COLUMNS</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {csvData[0].map((val,idx)=>(
                    <th key={idx} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 tracking-wider">
                      {val}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {csvData.slice(1).slice(page * 10, (page + 1) * 10).map((val,idx)=>(
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      {returnAsHTML(val)}
                    </tr>
                  ))}
              </tbody>
            </table>
            
            <div className='flex justify-center items-center p-4 bg-gray-50 border-t border-gray-200 gap-4'>
              <button 
                className='px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                title='Previous Page' 
                onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                disabled={page === 0}
              >
                Previous
              </button>
              <p className='text-sm text-gray-600 font-medium'>{page + 1} of {Math.max(1, Math.ceil(csvData.length / 10))}</p>
              <button 
                className='px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                title='Next Page' 
                onClick={() => setPage((prev) => Math.min(Math.ceil(csvData.length / 10) - 1, prev + 1))}
                disabled={page >= Math.ceil(csvData.length / 10) - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      {toast.msg.length > 0 && <Toast msg={toast.msg} ok={toast.ok} />}
      <Github repoURL={"https://github.com/bruzz-bruzz/csv-tabulator"} profileURL={"https://github.com/bruzz-bruzz"} />
    </div>
  )
}