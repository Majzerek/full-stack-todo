import {
  Card,
  Loader,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Wrapper,
} from "@/components";
import { useUserData } from "@/hooks/useUserData";
import { lazy, Suspense } from "react";

export const Profile = () => {
  const { userName, userInfo, loading, userID } = useUserData();

  if (loading)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );

  if (!userInfo || !userName) return;

  const Account = lazy(() => import("./components/account"));
  const Update = lazy(() => import("./components/updateInfo"));

  return (
    <Wrapper>
      <h1 className="text-center text-4xl font-bold my-10">
        Profile {userName.toUpperCase()}
      </h1>

      <div className="flex flex-col items-center gap-6 ">
        <Tabs
          defaultValue="account"
          className="w-full sm:w-[70vw] md:w-[85vw] m-5 transition-all  "
        >
          <TabsList>
            <TabsTrigger value="account">
              {userName?.toUpperCase()} Info
            </TabsTrigger>
            <TabsTrigger value="update">Update Profil</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Suspense
              fallback={
                <Card>
                  <Loader />
                </Card>
              }
            >
              <Account userInfo={userInfo} />
            </Suspense>
          </TabsContent>
          <TabsContent value="update">
            <Suspense
              fallback={
                <Card>
                  <Loader />
                </Card>
              }
            >
              <Update userInfo={userInfo} userID={userID} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </Wrapper>
  );
};
