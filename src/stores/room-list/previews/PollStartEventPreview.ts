/*
Copyright 2021 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { MatrixEvent } from "matrix-js-sdk/src/models/event";

import { IPreview } from "./IPreview";
import { TagID } from "../models";
import { _t, sanitizeForTranslation } from "../../../languageHandler";
import { getSenderName, isSelf, shouldPrefixMessagesIn } from "./utils";
import { POLL_START_EVENT_TYPE, TEXT_NODE_TYPE } from "../../../polls/consts";
import MatrixClientContext from "../../../contexts/MatrixClientContext";

export class PollStartEventPreview implements IPreview {
    public static contextType = MatrixClientContext;
    public context!: React.ContextType<typeof MatrixClientContext>;

    public getTextFor(event: MatrixEvent, tagId?: TagID, isThread?: boolean): string {
        let eventContent = event.getContent();

        if (event.isRelation("m.replace")) {
            // It's an edit, generate the preview on the new text
            eventContent = event.getContent()['m.new_content'];
        }

        // Check we have the information we need, and bail out if not
        if (!eventContent || !eventContent[POLL_START_EVENT_TYPE.name]) {
            return null;
        }

        let question =
            eventContent[POLL_START_EVENT_TYPE.name].question[TEXT_NODE_TYPE.name];
        question = (question || '').trim();
        question = sanitizeForTranslation(question);

        if (
            isThread ||
            isSelf(event) ||
            !shouldPrefixMessagesIn(event.getRoomId(), tagId)
        ) {
            return question;
        } else {
            return _t("%(senderName)s: %(message)s",
                { senderName: getSenderName(event), message: question },
            );
        }
    }
}
