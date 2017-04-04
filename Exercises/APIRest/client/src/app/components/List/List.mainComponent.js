import ListHoC from './List.hoc';
import ListContainer from './List.container';
import ListComponent from './List.component';

export default ListContainer(
  ListHoC(
    ListComponent
  )
);
