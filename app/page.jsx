import Feed from "./../components/Feed"


const Home = () => {
  return (
    <div className="sm:p-20 p-5 text-center">

      <div className="">
        <h1 className="text-center text-[60px] font-extrabold sm:mt-5 mt-5">
          Post questions and answer them with this <span className='font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'>platform</span>
        </h1>

        <p className="desc mt-10">AnsNow is an open-sorce learning platform tools for students to discover,create and share answers</p>
      </div>

      <Feed />
    </div>
  )
}

export default Home