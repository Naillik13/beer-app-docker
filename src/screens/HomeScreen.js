import React from "react"
import {StyleSheet, ActivityIndicator, Text, View} from "react-native";
import Colors from "../constants/Colors"
import BeerList from "../components/BeerList";
export default class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: false}
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        });
        return fetch('http://192.168.1.15:3000/api/beers')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    beers: responseJson,
                }, function(){

                });
            })
            .catch((error) =>{
                alert("An error has occurred while fetching beer list");
                console.error(error);
            });
    };

    render(){

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <View style={{flex: 1, paddingTop:20, alignItems: "center"}}>
                <View style={{flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <Text style={styles.title}>Our Beers</Text>
                    <Text style={{color: Colors.textColor, marginTop: 10}}>Here is all our beers!</Text>
                </View>
                <BeerList beers={this.state.beers} navigation={this.props.navigation}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 17,
        color: Colors.titleColor
    },
    date: {
        fontWeight: "bold",
        color: "grey"
    },
    subline: {
        color: "grey"
    },
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },
    subtitle: {
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 7,
        color: "#424242",
    },
    card: {
        elevation: 5,
        backgroundColor: "white",
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * 5 },
        shadowOpacity: 0.3,
        shadowRadius: 0.8 * 5,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#424242',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
});
