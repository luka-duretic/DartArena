package dartarena.backend.services;

import dartarena.backend.dto.MatchDto;
import java.util.*;

public interface MatchService {
    public Map<String, String> archiveMatch(MatchDto match);
}
