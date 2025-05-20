import Grid from "@/app/atoms/Grid"
import DropDown from "./atoms/dropdown";

function Home() {
  return (
    <Grid columns={3} className="flex text-center items-center justify-center h-screen bg-[linear-gradient(45deg,_#0de6fe,_#8f48ff)]">
      <div>
        left
      </div>
      <div>
        <DropDown
        label="Search a Company"
        backgroundColor="grey"
        borderRadius="md"
        selectSize={true}
        inputSelect={true}
        />
      </div>
      <div>
        right
      </div>
    </Grid>
  );
}

export default Home;