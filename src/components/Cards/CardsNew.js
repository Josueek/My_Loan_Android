import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Componente CourseCard: representa una tarjeta de curso individual en la interfaz de usuario
// Recibe como props: 
// - course: un objeto que contiene los detalles del curso (estado, código, nombre, instructor, etc.)
// - onEditPress: una función que se ejecuta cuando se presiona la tarjeta para editar el curso
// - onDeletePress: una función que se ejecuta cuando se presiona el botón de eliminar curso
const CourseCard = ({ course, onEditPress, onDeletePress }) => {
    return (
        <TouchableOpacity 
            style={styles.card} 
            // onPress llama a la función onEditPress y le pasa el curso como argumento
            onPress={() => onEditPress(course)}
        >
            {/* Sección superior de la tarjeta, contiene el estado y el código del curso */}
            <View style={styles.topSection}>
                {/* Texto que muestra el estado del curso (e.g., Pendiente, Completado) */}
                {/* El estilo del texto cambia según el estado del curso */}
                <Text style={[styles.status, styles[`status${course.status}`]]}>
                    {course.status}
                </Text>
                {/* Texto que muestra el código del curso (e.g., CS101) */}
                <Text style={styles.code}>
                    {course.courseCode}
                </Text>
            </View>

            {/* Sección que muestra el nombre del curso */}
            {/* Se usa un estilo más grande y en negrita para destacar el título */}
            <Text style={styles.title}>
                {course.courseName}
            </Text>

            {/* Sección que muestra el nombre del instructor del curso */}
            {/* Se utiliza un tamaño de fuente mediano y un color gris para el nombre del instructor */}
            <Text style={styles.instructorName}>
                {course.instructor}
            </Text>

            {/* Sección inferior de la tarjeta, contiene la cantidad de participantes, la fecha de inicio y el botón de eliminación */}
            <View style={styles.bottomSection}>
                {/* Texto que muestra la cantidad de participantes inscritos en el curso */}
                <Text style={styles.participants}>
                    Participants: {course.participants}
                </Text>
                {/* Texto que muestra la fecha de inicio del curso */}
                <Text style={styles.startDate}>
                    Starts: {course.startDate}
                </Text>
                {/* Botón que permite eliminar el curso */}
                {/* Al presionar este botón, se ejecuta la función onDeletePress y se pasa el curso como argumento */}
                <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => onDeletePress(course)}
                >
                    {/* Ícono de un basurero que representa la acción de eliminar */}
                    {/* Se usa el ícono 'delete' de la biblioteca MaterialIcons */}
                    <Icon name="delete" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

// Definición de los estilos para el componente CourseCard
const styles = StyleSheet.create({
    // Estilo para el contenedor principal de la tarjeta
    // Define el fondo, bordes redondeados, padding, márgenes y sombra
    card: {
        backgroundColor: '#f8f9fa', // Color de fondo gris claro
        borderRadius: 8, // Bordes ligeramente redondeados
        padding: 16, // Espacio interior alrededor del contenido
        marginVertical: 10, // Espacio vertical entre tarjetas
        marginHorizontal: 20, // Espacio horizontal entre tarjetas y bordes de la pantalla
        shadowColor: '#000', // Color de la sombra en iOS
        shadowOpacity: 0.1, // Opacidad de la sombra en iOS
        shadowRadius: 4, // Radio de la sombra en iOS
        elevation: 2, // Elevación para la sombra en Android
    },
    // Estilo para la sección superior de la tarjeta
    // Organiza el estado y el código del curso en una fila
    topSection: {
        flexDirection: 'row', // Organiza los elementos en una fila
        justifyContent: 'space-between', // Espacio entre los elementos para alinearlos en los extremos opuestos
    },
    // Estilo base para el texto que muestra el estado del curso
    status: {
        fontWeight: '600', // Peso de fuente semi-negrita
        fontSize: 14, // Tamaño de fuente mediano
        color: '#28a745', // Color verde por defecto (para estado "Aprobado", por ejemplo)
    },
    // Estilo para el texto que muestra el código del curso
    code: {
        fontSize: 12, // Tamaño de fuente más pequeño
        color: '#6c757d', // Color gris
    },
    // Estilo para el nombre del curso, que se muestra de manera destacada
    title: {
        fontSize: 18, // Tamaño de fuente grande para destacar el nombre
        fontWeight: '700', // Peso de fuente en negrita
        marginVertical: 10, // Espacio vertical alrededor del texto
    },
    // Estilo para el nombre del instructor
    instructorName: {
        fontSize: 16, // Tamaño de fuente mediano
        color: '#495057', // Color gris oscuro
        marginBottom: 10, // Espacio debajo del nombre del instructor
    },
    // Estilo para la sección inferior de la tarjeta
    // Organiza los participantes, la fecha de inicio y el botón de eliminación en una fila
    bottomSection: {
        flexDirection: 'row', // Organiza los elementos en una fila
        justifyContent: 'space-between', // Espacio entre los elementos para alinearlos en los extremos opuestos
        alignItems: 'center', // Alinea los elementos verticalmente en el centro
    },
    // Estilo para el texto que muestra la cantidad de participantes
    participants: {
        fontSize: 12, // Tamaño de fuente pequeño
        color: '#6c757d', // Color gris
    },
    // Estilo para el texto que muestra la fecha de inicio del curso
    startDate: {
        fontSize: 12, // Tamaño de fuente pequeño
        color: '#6c757d', // Color gris
    },
    // Estilo para el botón de eliminación
    // Define el fondo rojo, padding y bordes redondeados
    deleteButton: {
        backgroundColor: '#dc3545', // Color de fondo rojo para indicar la acción de eliminar
        padding: 5, // Espacio interior alrededor del ícono
        borderRadius: 4, // Bordes ligeramente redondeados
        alignItems: 'center', // Alinea el ícono horizontalmente en el centro
        justifyContent: 'center', // Alinea el ícono verticalmente en el centro
    },
    // Estilos adicionales para cambiar el color del estado según su valor
    statusPending: {
        color: '#ffc107', // Color amarillo para estado "Pendiente"
    },
    statusDenied: {
        color: '#dc3545', // Color rojo para estado "Denegado"
    },
    statusCompleted: {
        color: '#007bff', // Color azul para estado "Completado"
    },
});

export default CourseCard;
