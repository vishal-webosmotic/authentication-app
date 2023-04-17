import './Cardlist.css';

export const CardList = ({ card }) => {
  return (
    <div className="row">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description}</p>
          <p className="card-text">{card.userId}</p>
        </div>
      </div>
    </div>
    //    <td>{data.description}</td>
    //   <td>{data.title}</td>
    //   <td>{data.userId}</td>
  );
};
