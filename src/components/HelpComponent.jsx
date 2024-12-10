import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import faqData from '../data/faq_data.json';

const HelpScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleQuestion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      
      {faqData.map((item, index) => (
        <View key={index} style={styles.card}>
          <TouchableOpacity onPress={() => toggleQuestion(index)} style={styles.questionContainer}>
            <Text style={styles.question}>{item.question}</Text>
          </TouchableOpacity>
          {expandedIndex === index && (
            <View style={styles.answerContainer}>
              <Text style={styles.answer}>{item.answer}</Text>
              
            </View>
          )}
        </View>
      ))}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#F9C55E',
    borderRadius: 15,
    marginBottom: 5,
    overflow: 'hidden',
    elevation: 2,
  },
  questionContainer: {
    padding: 15,
    backgroundColor: '#FFA500',
  },
  question: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  answerContainer: {
    padding: 15,
    backgroundColor: '#f1f1f1',
  },
  answer: {
    fontSize: 18,
    color: '#333333',
  },
});

export default HelpScreen;
