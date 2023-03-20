import { Link } from 'react-router-dom';

import DifficultySelector from './DifficultySelector';

const NewPuzzleSettings = () => {
  return (
    <div>
      <section>
        <h2>Pick an image:</h2>
        <div>IMAGE CAROUSEL PLACEHOLDER</div>
      </section>
      <hr />
      <DifficultySelector />
      <hr />
      <Link to="puzzle">Start Puzzle</Link>
    </div>
  );
};

export default NewPuzzleSettings;
