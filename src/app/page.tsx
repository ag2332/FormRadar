import Grid from "@/app/atoms/Grid";
import DropDown from "./atoms/DropDown";

function Home() {
  return (
    <div className="bg-gradient-to-r from-blue to-purple">
      <div className="mx-auto max-w-[1700px]">
        <Grid
          columns={2}
          className="flex items-center justify-center h-screen w-full"
        >
          <div className="text-[#38003c] text-center">
            <h1 className="text-9xl mb-4">Form Radar</h1>
            <h2 className="text-5xl mb-4">The edge every FPL manager needs</h2>
            <h2 className="text-3xl">
              Track form, predict returns, and build a winning squad
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <DropDown
              label="Search a Player"
              backgroundColor="white"
              borderRadius="3xl"
              selectSize={true}
              inputSelect={true}
            />
          </div>
        </Grid>
      </div>
    </div>
  );
}

export default Home;
