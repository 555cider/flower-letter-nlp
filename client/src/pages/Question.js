import React from 'react';
import SidebarComponent from '../components/SidebarComponent';
import { Container } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { List, ListItem, ListIcon, UnorderedList,Flex, Box } from "@chakra-ui/react"
import {ArrowRightIcon} from '@chakra-ui/icons';
import WithBackgroundImage from '../components/WithBackgroundImage';
import Faq from '../components/about/Faq';
import QuestionForm from '../components/about/QuestionForm';

const Question = ({history})=>{
    return(
        <div style={{height:'100vh', overflow:'auto'}}>
            <SidebarComponent></SidebarComponent>      
            <Faq/>   
            <QuestionForm/>

            
        </div>

    );
}
export default Question;