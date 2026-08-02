pipeline {
    agent any

    options {
        disableConcurrentBuilds(abortPrevious: true)
        timeout(time: 20, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        GITHUB_TOKEN    = credentials('github-container')
        COOLIFY_WEBHOOK = credentials('coolify-webhook')   
        COOLIFY_TOKEN   = credentials('coolify-api-token')

        IMAGE_NAME      = 'siberiacancode/juniors-bootcamp-tester'
        IMAGE_VERSION   = 'latest'
    }

    stages {
        stage('build & push') {
            when {
                anyOf {
                    branch 'main'
                    expression { env.GIT_BRANCH == 'origin/main' }
                }
            }
            steps {
                sh 'docker build --build-arg -t ghcr.io/$IMAGE_NAME:$IMAGE_VERSION .'
                sh 'echo $GITHUB_TOKEN_PSW | docker login ghcr.io -u $GITHUB_TOKEN_USR --password-stdin'
                sh 'docker push ghcr.io/$IMAGE_NAME:$IMAGE_VERSION'
            }
        }

        stage('deploy via coolify') {
            when {
                anyOf {
                    branch 'main'
                    expression { env.GIT_BRANCH == 'origin/main' }
                }
            }
            steps {
                sh '''
                    curl --fail --request GET "$COOLIFY_WEBHOOK" \
                         --header "Authorization: Bearer $COOLIFY_TOKEN"
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
        }
        cleanup {
            sh 'docker system prune -f || true'
        }
    }
}