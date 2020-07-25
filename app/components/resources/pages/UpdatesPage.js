//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import IconButton from '../../buttons/IconButton';
import NewsApiHandler from '../../../handlers/news-api-manager';
import Listing from '../../listings/Listing';
import ArticleListingItem from '../../listings/ArticleListingItem';
import PageHeader from '../../listings/PageHeader';
import ArticleDetailPage from '../pages/ArticleDetailPage';

// create a component
class UpdatesPage extends Component {
    constructor(props) {
      super(props);

      this.state = {
        articles: [],
        initializing: true,
        header: 'COVID-19 Updates',
        subheader: 'Location: Maryland'
      };

      this.bindMethods()
          .initNewsApiHandler();
    }

    bindMethods() {
        this.handleClickItem = this.handleClickItem.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);

        return this;
    }

    initNewsApiHandler() {
      this.newsApiHandler = new NewsApiHandler();

      return this;
    }

    componentDidMount() {
      this.newsApiHandler.getUpdates()
        .then((data) => {
          this.setState({
            articles: data.response.docs,
            initializing: false
          });
        })
    }

    render() {
        const backButtonData = {
            handleClick: this.state.selectedArticle ? this.handleClickBack : this.props.handleClickBackButton,
            color: '#848484',
            name: 'md-arrow-back',
            type: 'ionicon'
          },
          markup = this.state.initializing ? this.buildLoadingState() : this.buildPage(),
          headerData = {
            header: this.state.header,
            subheader: this.state.subheader
          };

        return (
          <View style={{color: 'pink'}}>
            <View style={styles.headerWrapper}>
              <View style={styles.backButtonWrapper}>
                <IconButton {...backButtonData} />
              </View>
              <View style={styles.pageHeaderWrapper} >
                <PageHeader {...headerData}/>
              </View>
            </View>
            {markup}
          </View>
        );
    }

    handleClickItem(article) {
      this.setState({
        selectedArticle: article.uri,
        header: article.headline.main,
        subheader: null
      });
    }

    buildLoadingState() {
      return <ActivityIndicator size="large"/>;
    }

    buildPage() {
      let markup;

      if(!this.state.selectedArticle) {
        const listingData = {
            items: this.state.articles,
            handleClickItem: this.handleClickItem,
            listingItem: ArticleListingItem
          };

        markup =  <Listing {...listingData} />;
      } else {
        const articleIndex = this.state.articles.findIndex((article) => {
          return article.uri === this.state.selectedArticle;
        });


        markup = <ArticleDetailPage {...this.state.articles[articleIndex]} />
      }

      return markup;
    }

    handleClickBack() {
      this.setState({
        header: 'COVID-19 Updates',
        subheader: 'Location: Maryland',
        selectedArticle: null
      });
    }
}

// define your styles
const styles = StyleSheet.create({
    headerWrapper: {
      display: 'flex',
      flexDirection: 'row'
    },
    pageHeaderWrapper: {
      marginRight: 60,
      alignSelf: 'center',
      flex: 1
    },  
    backButtonWrapper: {
      alignSelf: 'flex-start',
      flexBasis: 60
    }
  });

//make this component available to the app
export default UpdatesPage;
