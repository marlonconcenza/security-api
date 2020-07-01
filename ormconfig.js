module.exports = {
    'type': 'postgres',
    'url': process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1:5432/authApi',
    'entities': [
        process.env.NODE_ENV === 'development' ? 'src/entities/**/*.ts' : 'dist/entities/**/*.js'
    ],
    'migrationsTableName': 'custom_migration_table',
    'migrations': [
        process.env.NODE_ENV === 'development' ? 'src/database/migrations/**/*.ts' : 'dist/database/migrations/**/*.js'
    ],
    'cli': {
        'entitiesDir': 'src/entities',
        'migrationsDir': 'src/database/migrations'
    }
};