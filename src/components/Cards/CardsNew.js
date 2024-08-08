import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CourseCard = ({ course, onEditPress, onDeletePress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onEditPress(course)}>
            <View style={styles.topSection}>
                <Text style={[styles.status, styles[`status${course.status}`]]}>{course.status}</Text>
                <Text style={styles.code}>{course.courseCode}</Text>
            </View>
            <Text style={styles.title}>{course.courseName}</Text>
            <Text style={styles.instructorName}>{course.instructor}</Text>
            <View style={styles.bottomSection}>
                <Text style={styles.participants}>Participants: {course.participants}</Text>
                <Text style={styles.startDate}>Starts: {course.startDate}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => onDeletePress(course)}>
                    <Icon name="delete" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    status: {
        fontWeight: '600',
        fontSize: 14,
        color: '#28a745',
    },
    code: {
        fontSize: 12,
        color: '#6c757d',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 10,
    },
    instructorName: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 10,
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    participants: {
        fontSize: 12,
        color: '#6c757d',
    },
    startDate: {
        fontSize: 12,
        color: '#6c757d',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 5,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusPending: {
        color: '#ffc107',
    },
    statusDenied: {
        color: '#dc3545',
    },
    statusCompleted: {
        color: '#007bff',
    },
});

export default CourseCard;
