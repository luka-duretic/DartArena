package dartarena.backend.exceptions;

import java.util.Map;

/**
 * Iznimka koja se koristi za označavanje pogrešaka prilikom prijave korisnika.
 */

public class LoginException extends RuntimeException {
    private final String error;

    public LoginException(String error) {
        this.error = error;
    }

    @Override
    public String getMessage() {
        return error;
    }
}
