pipeline {
    agent any

    stages {

        stage('Show Files') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Check Client') {
            steps {
                sh '''
                cd client
                ls -la
                '''
            }
        }

        stage('Check Server') {
            steps {
                sh '''
                cd server
                ls -la
                '''
            }
        }
    }
}
