import { v4 as uuidv4 } from "uuid";

const Rating = ({ value, color }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((rate) => (
        <span key={uuidv4()}>
          <i
            style={{ color }}
            className={
              value  === rate + 0.5
                ? "fas fa-star-half-alt"
                : value >= rate
                ? "fas fa-star"
                : "far fa-star"
            }
          >
            {" "}
          </i>
        </span>
      ))}
    </div>
  );
};
Rating.defaultProps = {
  color: "#FFA41C",
};
export default Rating;
