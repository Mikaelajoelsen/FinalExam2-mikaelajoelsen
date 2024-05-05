import { TbArrowsDiagonal } from "react-icons/tb";
export default function Tips() {
  return (
    <div className=" h-full  w-full drop-shadow-xl mt-16 p-10 ">
      <h1 className="flex justify-center ml-10 text-4xl drop-shadow-2xl text-black">
        Popular Places To Visit
      </h1>
      <div className="flex flex-wrap justify-between  m-5 relative ">
        <div className="relative mt-2 drop-shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1597535973747-951442d5dbc7?q=80&w=3136&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-96 w-64  drop-shadow-2xl rounded-t-full"
          />
          <p className="absolute bottom-0 left-0 right-0 text-white text-center bg-black bg-opacity-50 p-2">
            <TbArrowsDiagonal />
            MIAMI
          </p>
        </div>
        <div className="relative mt-2">
          <img
            src="https://images.unsplash.com/photo-1555992828-ca4dbe41d294?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-96 w-64 drop-shadow-2xl rounded-t-full"
          />
          <p className="absolute bottom-0 left-0 right-0 text-white text-center bg-black bg-opacity-50 p-2">
            <TbArrowsDiagonal />
            ROME
          </p>
        </div>
        <div className="relative mt-2">
          <img
            src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-96 w-64  drop-shadow-2xl rounded-t-full"
          />
          <p className="absolute bottom-0 left-0 right-0 text-white text-center bg-black bg-opacity-50 p-2 ">
            <TbArrowsDiagonal />
            PARIS
          </p>
        </div>
        <div className="relative mt-2">
          <img
            src="https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=3136&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-96 w-64 drop-shadow-2xl rounded-t-full"
          />
          <p className="absolute bottom-0 left-0 right-0 text-white text-center bg-black bg-opacity-50 p-2">
            <TbArrowsDiagonal />
            BARCELONA
          </p>
        </div>
      </div>
    </div>
  );
}
