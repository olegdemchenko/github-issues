import {
  Col,
  Badge,
  Form,
} from 'react-bootstrap';

const FilteringCriteria = ({ criteria, changeCriteria }) => {

  const handleChange = (fieldType) => (e) => {
    changeCriteria(fieldType, e.target.value);
  };

  return (
    <Form className="row mx-3 my-5">
      <Col className="col-12 mb-4" md="6">
        <h4>
          <Badge bg="dark">Username</Badge>
        </h4>
        <h4>olegdemchenko</h4>
      </Col>
      <Col className="col-12 mb-4" md="6">
        <h4>
          <Badge bg="dark">Repository</Badge>
        </h4>
        <h4>frontend-project-lvl3</h4>
      </Col>
      <Form.Group className="col-12 col-md-6 mb-5">
        <Form.Label htmlFor="labelFilter">
          <h4>
            <Badge bg="dark">Filter by label</Badge>
          </h4>
        </Form.Label>
        <Form.Control
          id="labelFilter"
          name="labelFilter"
          value={criteria.labelFilter}
          onChange={handleChange('labelFilter')}
          placeholder="label" 
        />
      </Form.Group>
      <Form.Group className="col-12 col-md-6 mb-5">
        <Form.Label htmlFor="assigneeFilter">
          <h4>
            <Badge bg="dark">Filter by assignee</Badge>
          </h4>
        </Form.Label>
        <Form.Control
          id="assigneeFilter"
          name="assigneeFilter"
          placeholder="assignee"
          value={criteria.assigneeFilter}
          onChange={handleChange('assigneeFilter')}
        />
      </Form.Group>
      <Form.Group className="col-12 col-md-6">
        <Form.Label htmlFor="sortOrder">
          <h4>
            <Badge bg="dark">Sort by date</Badge>
          </h4>
        </Form.Label>
        <Form.Select
          id="sortOrder"
          name="sortOrder"
          value={criteria.sortOrder}
          onChange={handleChange('sortOrder')}
        >
          <option>Select sorting order</option>
          <option value="asc">Newest</option>
          <option value="desc">Oldest</option>
        </Form.Select>
      </Form.Group>
    </Form>
  );
};

export default FilteringCriteria;