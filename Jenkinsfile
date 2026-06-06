pipeline {
    agent any

    environment {
        APP_NAME = 'Laundry'
    }

    stages {

        stage('Build Info') {
            steps {
                echo "Building ${APP_NAME}"
                sh 'git rev-parse --short HEAD'
            }
        }

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

    post {
        success {
            echo 'Pipeline completed successfully'
        }

        failure {
            echo 'Pipeline failed'
        }
    }
}
