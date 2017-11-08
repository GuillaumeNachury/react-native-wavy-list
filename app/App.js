/**
    @__Guillaume  
*/


import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, SectionList, ListItem
} from 'react-native';

import WSController from '@components/WavyScrollController';

const dataSource = [{"title":"A","data":[{"name":"Armstrong Mcguire"},{"name":"Aguirre Richmond"},{"name":"Autumn Cote"},{"name":"Arlene Albert"},{"name":"Alexis Walsh"}]},{"title":"B","data":[{"name":"Brooke Campbell"},{"name":"Blair Guy"},{"name":"Blanca Sweeney"},{"name":"Baird Thompson"},{"name":"Bianca Stevenson"},{"name":"Beverley Moore"},{"name":"Bean Hawkins"},{"name":"Bertha Calhoun"},{"name":"Bishop Newman"}]},{"title":"C","data":[{"name":"Catalina Ferrell"},{"name":"Cheri Ballard"},{"name":"Cynthia Morton"},{"name":"Cassandra Carrillo"},{"name":"Carmen Monroe"},{"name":"Castillo Mckee"},{"name":"Chris Flowers"}]},{"title":"D","data":[{"name":"Deanna Santiago"},{"name":"Dorothy Johnston"},{"name":"Daisy Elliott"},{"name":"Darla Daugherty"},{"name":"Diaz Pruitt"},{"name":"Deloris Forbes"},{"name":"Dawn Carpenter"}]},{"title":"E","data":[{"name":"Ernestine Blanchard"},{"name":"Elva Griffith"},{"name":"Eaton Farley"},{"name":"Estela Spencer"},{"name":"Elena Merritt"},{"name":"Eula Rojas"}]},{"title":"F","data":[{"name":"Frances Hunter"},{"name":"Franks Howard"},{"name":"Faye Wolfe"},{"name":"Finley Moss"},{"name":"Faulkner Bradford"}]},{"title":"G","data":[{"name":"Graham Chen"},{"name":"Green Cummings"},{"name":"Gretchen Downs"},{"name":"Gracie Bush"},{"name":"Gay Luna"},{"name":"Gray Conley"},{"name":"Gabriela Slater"}]},{"title":"H","data":[{"name":"Houston Burris"},{"name":"Helena Warren"},{"name":"Hernandez Bauer"},{"name":"Hyde Fuller"},{"name":"Holt Townsend"},{"name":"Holder Mcconnell"},{"name":"Hester Salazar"},{"name":"Haley Cantrell"},{"name":"Hunter Mejia"}]},{"title":"I","data":[{"name":"Irma Dickerson"}]},{"title":"J","data":[{"name":"Josephine Lindsay"},{"name":"Jordan Mcintyre"},{"name":"Juanita Vincent"},{"name":"Jacobs Hatfield"},{"name":"Julianne Lott"},{"name":"Jeanie Robertson"}]},{"title":"K","data":[{"name":"Kitty Norman"},{"name":"Kelley Barlow"},{"name":"Katrina Britt"},{"name":"Kline Trujillo"}]},{"title":"L","data":[{"name":"Lourdes Mcbride"},{"name":"Lori Cotton"},{"name":"Lesa Mccoy"},{"name":"Louisa Head"},{"name":"Love Watson"},{"name":"Lydia Hyde"},{"name":"Lenora Watkins"}]},{"title":"M","data":[{"name":"Morgan Dunn"},{"name":"Marianne Hays"},{"name":"Miranda Casey"},{"name":"Mamie Drake"},{"name":"Marilyn Velasquez"},{"name":"Malone Bird"},{"name":"Mona Burns"},{"name":"Mcdaniel Crane"},{"name":"Melendez Petersen"},{"name":"Meredith Maxwell"},{"name":"Mckinney Crosby"}]},{"title":"O","data":[{"name":"Olsen Burnett"},{"name":"Osborn Dillard"}]},{"title":"P","data":[{"name":"Pollard Chang"}]},{"title":"R","data":[{"name":"Robbins Macdonald"},{"name":"Rojas Rogers"},{"name":"Ruth Franklin"},{"name":"Roberta Lambert"},{"name":"Ramirez Berry"}]},{"title":"S","data":[{"name":"Susanna Adams"},{"name":"Sybil Rosa"},{"name":"Shirley Case"},{"name":"Sandoval Duffy"}]},{"title":"T","data":[{"name":"Trisha Atkinson"},{"name":"Terri Woods"},{"name":"Tami Levy"}]},{"title":"U","data":[{"name":"Underwood Mullen"}]},{"title":"V","data":[{"name":"Vasquez Bridges"},{"name":"Villarreal Parks"}]},{"title":"W","data":[{"name":"Wilkins Valenzuela"},{"name":"Watson Lowery"},{"name":"Wise Walker"}]}];
export default class App extends Component<{}> {

  _scrollToSection(idx) {
    this.list.scrollToLocation({ itemIndex: 0, sectionIndex: idx, animated: true })
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Wavy list</Text>
        <View style={styles.body} >
          <SectionList
          stickySectionHeadersEnabled={false}
            ref={(ref) => this.list = ref}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Text style={styles.name}>{item.name} </Text>}
            renderSectionHeader={({ section }) => <Text style={styles.section}>{section.title}</Text>}
            keyExtractor={(el) => el.name}
            sections={
              dataSource
            }

          />
          <WSController onScrollToSection={(idx) => this._scrollToSection(idx)} dataSource={dataSource} vOffset={95}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    
    backgroundColor: '#171B2D',
    paddingBottom: 10,
  },
  title:{
    alignSelf:'center',
    fontSize:35,
    fontWeight:'bold',
    color:"#FFF",
    margin:30
  },
  body:{
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
    paddingRight: 10
  },
  section: {
    color: '#FFF',
    fontSize: 20,
    padding: 10,
    fontWeight: "bold"
  },
  name: {
    color: '#FFF',
    fontSize: 14
  },
  list: {
    flex: 1,
    paddingLeft: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
