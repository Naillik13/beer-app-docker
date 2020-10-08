import React from "react"
import {View, ActivityIndicator} from "react-native";
import BeerDetails from "../components/BeerDetails";
import {ScrollView} from "react-navigation";

export default class DetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            favoriteList: []
        }
    }

    componentDidMount(){
        return fetch('http://192.168.1.15:3000/api/beers/' + this.props.navigation.getParam("id"))
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    beer: responseJson,
                }, function(){

                });

            })
            .catch((error) =>{
                alert("An error has occurred while fetching beer");
                console.error(error);
            });
    }

    render(){

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <ScrollView style={{flex: 1, paddingTop:20}}>
                <BeerDetails beer={this.state.beer}/>
            </ScrollView>
        );
    }

}

