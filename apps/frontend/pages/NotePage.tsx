import Banner from "@/components/Note/Banner";
import Properties from "@/components/Note/Properties";
import TitleNote from "@/components/Note/TitleNote";
import useNote from "@/hooks/useNote";

const NotePage = () => {
  const { note } = useNote();


  return (
    <div>
      <Banner />
      <TitleNote />
      <Properties />
    </div>
  );
};

export default NotePage;
