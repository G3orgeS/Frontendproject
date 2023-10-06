import '../css/components/Showbtn.css'

interface ShowbtnProps {
  onClick: () => void;
}

const Showbtn: React.FC<ShowbtnProps> = ({ onClick }) => {
  return (
    <button className='showbtn' onClick={onClick}>Show More</button>
  );
}

export default Showbtn;