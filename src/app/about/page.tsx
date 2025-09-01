import Grid from "@/app/components/atoms/Grid";
import DropDown from "../components/atoms/dropdown";
import { Player } from "../utilities/types";

function Home() {
  return (
    <Grid
      columns={2}
      className="flex items-center justify-center h-screen w-full bg-[linear-gradient(45deg,_#0de6fe,_#8f48ff)]"
    >
      <div className="text-[#38003c] text-center">
        <h1 className="text-9xl mb-4">Form Radar</h1>
        <h2 className="text-5xl mb-4">The edge every FPL manager needs</h2>
        <h2 className="text-3xl">Track the form, predict returns, and build a winning squad</h2>
      </div>
      <div className="flex justify-center items-center">
        <DropDown
          label="Search a Player"
          backgroundColor="white"
          borderRadius="3xl"
          selectSize={true}
          inputSelect={true} items={[]} onPlayerSelect={function (player: Player): void {
            throw new Error("Function not implemented.");
          } }        />
      </div>
    </Grid>
  );
}

export default Home;
