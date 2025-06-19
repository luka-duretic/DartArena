package dartarena.backend.exceptions;

import java.security.InvalidParameterException;

public class InvalidFormatException extends RuntimeException {
    private final String error;

    public InvalidFormatException(String error) {
        this.error = error;
    }

    @Override
    public String getMessage() {
        return error;
    }
}
