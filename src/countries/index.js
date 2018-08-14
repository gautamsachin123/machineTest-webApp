import React, { Component } from "react";
import { GridView, GridViewColumn } from "../common/GridView";
import Box, {
  BoxBody,
  BoxHeader,
  BoxFooter,
  BoxTools,
  BoxTitle
} from "../common/ExtendedBox";
import { Button, Pager, Col, Checkbox } from "react-bootstrap";
import { fetchCountriesRequest, deleteCountryRequest, logoutHandler } from "./actions";
import { connect } from "react-redux";

class CountriesList extends Component {
  state = {
    pageIndex: 1,
    fields: [
    ]
  };


  limit = 15
  default = ["name","capital","area","region","demonym"];

  componentWillReceiveProps(nextProps) {
if(nextProps && nextProps.countries.length>0){
    let fields = Object.keys(nextProps.countries[0]).map((key)=>{
      return {
        name:key,
        label:key,
        visible:this.default.includes(key)?true:false
      }
    })
    this.setState({fields});}
}


  componentWillMount() {
    this.fetchCountries({});
  }

  fetchCountries = ({name='', id='',skip=0,limit=15}) => {
    this.props.fetchCountriesRequest({name,
      id:'',
      skip:this.limit * (this.state.pageIndex - 1),
      limit:this.limit
    });
  }

  deleteCountryById = (id, skip, limit) => {
    this.props.deleteCountryById(id, 5, limit);
  }
  // onRowClick= (rowData)=>{

  // }
  nextClick = () => {
    this.setState({
      pageIndex: this.state.pageIndex + 1
    }, () => {
      this.fetchCountries({});
    })
  }

  prevClick = () => {
    this.setState({
      pageIndex: this.state.pageIndex - 1
    }, () => {
      this.fetchCountries({})
    })
  }

  deleteCountry(id) {
    this.setState({
      pageIndex: this.state.pageIndex - 1
    }, () => {
      this.deleteCountryById(id, this.limit * (this.state.pageIndex - 1),
        this.limit)
    })
  }
  logoutHandler() {
    this.props.logoutHandler();
  }



  RowComponent = ({ columns, rowData, onRowClick = () => {

  } }) => {
    const getContent = (rowData, column) => {

      let content = rowData[column.key];
      // if(column.key == 'altSpellings'){
      //   return  <h1>hello</h1>
      // }
      if (column.key === 'deleteBtn') {
        return <Button onClick={() => this.deleteCountry(rowData._id)} bsStyle="warning"> Delete </Button>
      }

      if (column.key === 'editBtn') {
        return <Button onClick={() => this.props.router.push('edit-country/' + rowData._id)} bsStyle="success"> Edit </Button>
      }

      if (Array.isArray(content)) {
        return content.map((data, i) => <p key={i}>{data}</p>
        )
      }
      return content;
    };
    return (
      <tr style={{textAlign:'left'}} key={rowData.id} onClick={() => onRowClick(rowData)}>
        {columns.map(column => (
          <td
            style={column.textAlign ? { textAlign: column.textAlign } : {}}
            key={column.key}
          >
            {getContent(rowData, column)}
          </td>
        ))}
      </tr>
    );
  };

  onFieldChange = (name, e) => {
    const fields = this.state.fields.slice();
    const index = fields.findIndex(field => field.name === name);
    if (index > -1) {
      fields[index] = { ...fields[index], visible: !fields[index].visible };
    }
    this.setState({
      fields
    })
  }

  handleSearchButton = (e)=>{
    console.log('inside the earhc handler',e.target.value);
    let search =e.target.value;
    this.fetchCountries({name:search});
  }

  render = () => (
    <Box noTopBorder>
      <BoxHeader>
        <BoxTitle><div>Countries</div>
        <div>
          <input style={{padding:'7px', textAlign:'center'}} type="text" placeholder="SearchCountries" onChange= {this.handleSearchButton.bind(this) }/>
          </div>
          </BoxTitle>
        <BoxTools>
          <Button
            onClick={() => {
              this.props.router.push("add-country")
            }}
          >
            Add Country
          </Button>
          <Button  bsStyle="warning"
            onClick={() => {
              this.logoutHandler();
            }}
          >
            Logout
          </Button>
          
        </BoxTools>
        
      </BoxHeader>

      <BoxBody>
        <Col sm={2} style={{background: "#e6e6e6", textAlign: "left"}}>
          {this.state.fields.map((field, i) => (
            <Col key={i} sm={12}>
              <Checkbox checked={field.visible} onChange={this.onFieldChange.bind(this, field.name)}>{field.label}</Checkbox>
            </Col>
          ))}

        </Col>
        <Col sm={10}>
          <GridView items={this.props.countries} RowComponent={this.RowComponent}>

            {this.state.fields.map((field, i) => {
              return field.visible ? (
                <GridViewColumn propKey={field.name} label={field.label} />
              ) : null
            })}
            <GridViewColumn propKey='deleteBtn' label="" />
            <GridViewColumn propKey='editBtn' label="" />

          </GridView>
        </Col>
      </BoxBody>
      <BoxFooter>
        <Pager bsClass="pagination">
          <Pager.Item disabled={this.state.pageIndex === 1} onClick={this.prevClick} href="#">
            Previous
          </Pager.Item>
          <Pager.Item onClick={this.nextClick} href="#">
            Next
          </Pager.Item>
        </Pager>
      </BoxFooter>
    </Box>
  );
}

const mapStateToProps = ({ country }) => ({
  countries: country.countries || [],
  requesting: country.requesting
});

const mapDispatchProps = dispatch => ({
  fetchCountriesRequest: ({name='',id='', skip=0, limit=this.limit}) => {
    dispatch(fetchCountriesRequest({name,id, skip, limit}))

  },
  deleteCountryById: (id, skip, limit) => {
    dispatch(deleteCountryRequest(id, skip, limit))
  },
  logoutHandler: () => {
    dispatch(logoutHandler())
  },

});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(CountriesList);
