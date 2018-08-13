import { ControlLabel, FormControl, FormGroup, Col, Form } from 'react-bootstrap';
import React, { Component } from "react";
import Box, {
  BoxBody,
  BoxHeader,
  BoxFooter,
  BoxTools,
  BoxTitle
} from "../common/ExtendedBox";
import { fetchCountriesRequest,saveCountryData } from "../countries/actions";
import { connect } from "react-redux";
import { browserHistory } from 'react-router'

class AddCountry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schema: [
           
            ],
            model: {
            },
            cancelFlag: false
        }
    }

    enterInput(val, e) {
        this.setState({
            cancelFlag: false 
        })
        var a = this.state.model;
        Object.keys(a).map((elem, ind) => {
            if (elem == val) {
                a[elem] = e.target.value
            }
        });
        this.setState({
            model: a
        })
    }
    saveCountryData = (model) => {
        this.props.saveCountryData(model);
      }
    
    handleSave(e){
        e.preventDefault();
        debugger;
        this.saveCountryData(this.state.model);

    }
    handleCancel(e){
        e.preventDefault();
        browserHistory.push('/countries')
    }
ignoreArray = ['_id','__v']

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.countries[0]){
        let schema = Object.keys(nextProps.countries[0])
        schema.splice(schema.indexOf('_id'),1);
        schema.splice(schema.indexOf('__v'),1)
        let model ={}
        if(!(nextProps.route.path.substring(1,4)=='add')) {model= {...nextProps.countries[0]}
        console.log('model is ',model);
        this.setState({model,schema});
         //
    }
        else if (nextProps.route.path.substring(1,4)=='add') { let keyArray = Object.keys(nextProps.countries[0]);
            for(let i=0;i<keyArray.length;i++){
                if(!this.ignoreArray.includes(keyArray[i]))model[keyArray[i]]='';
            }
            this.setState({model,schema});
             
        }
    }
    }
    componentDidMount(){
        const id = this.props.routeParams.id;
       if(id) this.fetchCountries({name:'',id});
       else {
        console.log('inside component did mount',this.state.model)};

    }
componentWillMount(){
    this.fetchCountries({});
}
    fetchCountries = ({name,id}) => {
        this.props.fetchCountriesRequest({name,id});
      }

    render() {
        return (
            <Form horizontal>
                {this.state.schema.map((el, il) => {
                    return (
                        <FormGroup key={il}>
                             <Col componentClass={ControlLabel} sm={2}>
                             {el} 
                                </Col>
                                <Col sm={10}>
                            <FormControl
                                onChange={this.enterInput.bind(this, el)}
                                componentClass="input"
                                placeholder={`Enter ${el}`}
                                value={this.state.cancelFlag ? '' : this.state.model[el]}
                            >
                            </FormControl>
                            </Col>
                        </FormGroup>
                    )
                })}
                <button className="btn btn-primary" onClick={this.handleSave.bind(this)}>Save</button>
                <button className="btn btn-primary" onClick={this.handleCancel.bind(this)}>Back</button>
            </Form>
        )
    }
}

const mapStateToProps = ({country}) => ({
    countries: country.countries || [],
    requesting: country.requesting
  });
  
  const mapDispatchProps = dispatch => ({
    fetchCountriesRequest: ({name,id,skip, limit}) =>{
      dispatch(fetchCountriesRequest({name,id,skip, limit}))
  
    },
    saveCountryData:(model)=>{
      dispatch(saveCountryData(model))
    },
    
  });


export default connect(
    mapStateToProps,
    mapDispatchProps
  )(AddCountry);