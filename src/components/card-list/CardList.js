import style from './Cardlist.module.css';

export const CardList = ({ card }) => {
  return (
    <div className={style.row}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description}</p>
          <p className="card-text">{card.userId}</p>
        </div>
      </div>
    </div>
  );
};
