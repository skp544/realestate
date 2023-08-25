import "./properties.css";
import { Error, Loader, PropertyCard, SearchBar } from "../../components";
import useProperties from "../../hooks/useProperties";

const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  // console.log(data.residencies);

  if (isError) {
    return <Error />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar />

        <div className="paddings flexCenter properties">
          {data?.map((card) => (
            <PropertyCard card={card} key={card.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
