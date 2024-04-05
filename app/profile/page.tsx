import React from "react";
import ProfileLeft from "@/components/shared/profile/ProfileLeft";
import EditUserForm from "@/components/shared/profile/right/EditUserForm";
import CreatePostForm from "@/components/shared/profile/right/CreatePostForm";
import AllUserPosts from "@/components/shared/profile/right/AllUserPosts";
import EditPost from "@/components/shared/profile/right/editPost/EditPost";

const Page = ({ searchParams }: any) => {
  const getAction = searchParams.profile;
  const getId = searchParams.id;

  // const session = await getServerSession(authOptions);

  return (
    // <div className="min-h-[calc(100vh-85px)] md:min-h-[calc(100vh-75px)]   max-w-[1440px] mx-auto sm:px-2 md:px-8 lg:px-12 xl:px-14 border-t-[1px] border-black flex flex-col sm:flex-row">
    <div className="min-h-[calc(100vh-85px)] md:min-h-[calc(100vh-75px)] max-w-[1440px] mx-auto sm:px-2  border-t-[1px] border-black flex flex-col sm:flex-row">
      {/*px-2 sm:px-4 max-w-[1440px] mx-auto md:px-8 lg:px-12 xl:px-14*/}
      <section className="sm:min-h-[calc(100vh-85px)] px-0 sm:bg-gradient-to-l from-[#EDEBEB] from-60% to-white w-full sm:w-[240px] md:w-[280px] lg:w-[400px]  border-b-[1px]  sm:border-r-[1px] border-black flex sm:justify-end">
        <div className="w-full h-full">
          <ProfileLeft />
        </div>
      </section>
      <section className="flex-1 sm:px-0 sm:py-3 flex justify-center mt-4 sm:mt-0">
        <div className="w-[95%] h-full py-2 sm:py-0 relative">
          {getAction === "add" && <CreatePostForm />}
          {getAction === "edit" && <EditUserForm />}
          {getAction === "posts" && <AllUserPosts />}
          {getAction === "edit-post" && <EditPost articleId={getId} />}
        </div>
      </section>
    </div>
  );
};

export default Page;
