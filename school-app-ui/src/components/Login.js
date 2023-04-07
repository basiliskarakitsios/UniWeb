const Login = ({children}) => {
  return (
    <div className="flex h-screen bg-slate-500">
        <div className="m-auto bg-slate-50 rounded-md overflow-hidden w-3/5 h-5/6 grid md:grid-cols-2 shadow-xl">
          <div className="relative">
            <img src="../../uniClass.png" alt="Class Image" className="absolute h-full w-full object-cover"></img>
          </div>          
          <div className="right flex flex-col justify-evenly">
            <div className="text-center py-2">
              {children}
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default Login