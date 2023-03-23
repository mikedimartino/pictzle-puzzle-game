import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { load } from '../../../redux/slices/activePuzzleSlice';
import { useAppDispatch } from '../../../redux/store';
import { SettingsContext } from '../SettingsContext';

const useStartPuzzle = () => {
  const dispatch = useAppDispatch();
  const { rows, columns, imageSrc } = useContext(SettingsContext);
  const navigate = useNavigate();

  return useCallback(() => {
    dispatch(load({ rows, columns, imageSrc }));
    navigate('/puzzle');
  }, [columns, dispatch, imageSrc, navigate, rows]);
};

export default useStartPuzzle;
