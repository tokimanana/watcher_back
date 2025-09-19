# Token Revocation System Usage

This document explains how to use the token revocation system implemented in your user service.

## How it works

1. **Token Version Tracking**: Each user has a `tokenVersion` field that starts at 0
2. **Login Revokes Previous Tokens**: When a user logs in, their `tokenVersion` is incremented, making all previous tokens invalid
3. **Token Validation**: The authentication middleware validates both token signature and version
4. **Manual Revocation**: Users can manually revoke all their tokens via API endpoint

## API Endpoints

### 1. Login (POST /users/authenticate)
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Behavior**: 
- Increments user's `tokenVersion`
- All previous tokens become invalid
- Returns new access and refresh tokens

### 2. Manual Token Revocation (POST /users/revoke-tokens)
**Headers**: `Authorization: Bearer <your-token>`

**Behavior**:
- Increments user's `tokenVersion`
- All current tokens become invalid
- User must login again

### 3. Token Refresh (POST /users/refresh-token)
```json
{
  "refreshToken": "your-refresh-token"
}
```

**Behavior**:
- Validates token version before refreshing
- Returns new tokens only if current token is valid

## Usage Examples

### Frontend Implementation

```javascript
// Login - automatically revokes previous sessions
async function login(email, password) {
  const response = await fetch('/users/authenticate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (response.ok) {
    const { accessToken, refreshToken } = await response.json();
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
}

// Manual logout - revokes all tokens
async function logout() {
  const token = localStorage.getItem('accessToken');
  
  try {
    await fetch('/users/revoke-tokens', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (error) {
    console.log('Token revocation failed:', error);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

// Axios interceptor for handling revoked tokens
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Token is invalid/revoked - redirect to login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Security Benefits

1. **Single Session Enforcement**: Users can only have one valid session at a time
2. **Immediate Revocation**: Tokens are instantly invalidated across all devices
3. **Compromise Protection**: If tokens are compromised, login from legitimate device revokes malicious tokens
4. **Clean Logout**: Manual revocation ensures complete session termination

### Database Migration

You'll need to add the `tokenVersion` column to your user table:

```sql
ALTER TABLE user ADD COLUMN token_version INTEGER DEFAULT 0;
```

Or run your TypeORM migrations to automatically add the field.

## Error Messages

- `"Authentification échouée : Jeton révoqué."` - Token has been revoked
- `"Authentification requise : Jeton manquant ou mal formaté."` - Missing/malformed token  
- `"Authentification échouée : Jeton expiré."` - Token has expired
- `"Authentification échouée : Jeton invalide."` - Invalid token signature
