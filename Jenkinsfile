pipeline {
    agent any

    stages {

        stage('Check Tools') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Client Dependencies') {
            steps {
                dir('client') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Server Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }
    }
}
