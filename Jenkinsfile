pipeline {
    agent any

    stages {

        stage('Install Client') {
            steps {
                dir('client') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build Client') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Install Server') {
            steps {
                dir('server') {
                    sh 'npm ci'
                }
            }
        }

        stage('Test Server') {
            steps {
                dir('server') {
                    sh 'npm test'
                }
            }
        }
    }
}
