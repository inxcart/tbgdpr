import { connect } from 'react-redux';

import AllCustomerRequestsTable from '../components/AllCustomerRequestsTable';

const mapStateToProps = (state) => {
  return {
    translations: state.translations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const AllCustomerRequestsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCustomerRequestsTable);

export default AllCustomerRequestsTableContainer;
